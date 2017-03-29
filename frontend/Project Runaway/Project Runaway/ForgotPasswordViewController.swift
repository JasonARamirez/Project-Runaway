//
//  ForgotPasswordViewController.swift
//  Project Runaway
//
//  Created by DeQuan Burnside on 3/10/17.
//  Copyright © 2017 se329. All rights reserved.
//

import UIKit


// MARK: -
// TODO: -
// FIXME: -

class ForgotPasswordViewController: UIViewController {
    
    @IBOutlet weak var pageTitle: UILabel!

    @IBOutlet weak var pagePrompt: UILabel!
    
    @IBOutlet weak var usernameTextField: UITextField!
    
    @IBAction func submitButtonPressed(_ sender: Any) {
        
        performSegue(withIdentifier: "toHome", sender: self)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
